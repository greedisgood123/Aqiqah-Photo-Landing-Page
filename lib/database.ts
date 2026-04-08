import { supabase, type Folder, type Image } from './supabase'

export interface PortfolioFolder {
  id: string
  name: string
  displayName: string
  thumbnail: string
  images: string[]
  date?: string
}

export interface PortfolioImage {
  id: string
  filename: string
  order: number
  folderName: string
  folderDisplayName: string
}

/**
 * Fetch all portfolio folders ordered by date (newest first)
 */
export async function fetchPortfolioFolders(): Promise<PortfolioFolder[]> {
  const { data: folders, error } = await supabase
    .from('folders')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching folders:', error)
    return []
  }

  // Transform database folders to portfolio folder structure
  const portfolioFolders = await Promise.all(
    folders.map(async (folder: Folder) => {
      const { data: images, error: imagesError } = await supabase
        .from('images')
        .select('*')
        .eq('folder_id', folder.id)
        .order('order_index', { ascending: true })

      if (imagesError) {
        console.error(`Error fetching images for folder ${folder.name}:`, imagesError)
        return {
          id: folder.id,
          name: folder.name,
          displayName: folder.display_name,
          thumbnail: getPublicUrl('portfolio', folder.name, images?.[0]?.filename || ''),
          images: images?.map(img => getPublicUrl('portfolio', folder.name, img.filename)) || [],
          date: folder.date
        }
      }

      // Use first image as thumbnail, or empty array
      const thumbnailFile = images?.[0]?.filename || ''
      const allImages = images?.map(img => img.filename) || []

      return {
        id: folder.id,
        name: folder.name,
        displayName: folder.display_name,
        thumbnail: getPublicUrl('portfolio', folder.name, thumbnailFile),
        images: allImages.map(filename => getPublicUrl('portfolio', folder.name, filename)),
        date: folder.date
      }
    })
  )

  return portfolioFolders
}

/**
 * Generate public URL for an image in Supabase storage
 */
function getPublicUrl(bucket: string, folder: string, filename: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const url = new URL(`${supabaseUrl}/storage/v1/object/public/${bucket}/${folder}/${filename}`)
  return url.toString()
}

/**
 * Get a single portfolio folder by name
 */
export async function fetchPortfolioFolder(folderName: string): Promise<PortfolioFolder | null> {
  const { data: folders } = await supabase
    .from('folders')
    .select('*')
    .eq('name', folderName)
    .single()

  if (!folders) {
    return null
  }

  const { data: images, error: imagesError } = await supabase
    .from('images')
    .select('*')
    .eq('folder_id', folders.id)
    .order('order_index', { ascending: true })

  if (imagesError) {
    console.error(`Error fetching images for folder ${folderName}:`, imagesError)
    return null
  }

  const thumbnailFile = images?.[0]?.filename || ''
  const allImages = images?.map(img => img.filename) || []

  return {
    id: folders.id,
    name: folders.name,
    displayName: folders.display_name,
    thumbnail: getPublicUrl('portfolio', folders.name, thumbnailFile),
    images: allImages.map(filename => getPublicUrl('portfolio', folders.name, filename)),
    date: folders.date
  }
}
