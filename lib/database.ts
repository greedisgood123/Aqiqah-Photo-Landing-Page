import { getSupabaseClient, type Folder, type Image } from './supabase'

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

function getPublicUrl(folder: string, filename: string): string {
  const supabase = getSupabaseClient()
  const { data } = supabase.storage.from('portfolio').getPublicUrl(`${folder}/${filename}`)
  return data.publicUrl
}

/**
 * Fetch all portfolio folders with their images in a single query
 */
export async function fetchPortfolioFolders(): Promise<PortfolioFolder[]> {
  const supabase = getSupabaseClient()

  const { data: folders, error } = await supabase
    .schema('portfolio')
    .from('folders')
    .select('*, images(*)')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching folders:', error)
    return []
  }

  return folders.map((folder: Folder & { images: Image[] }) => {
    const images = (folder.images || []).sort((a, b) => a.order_index - b.order_index)
    const thumbnailFile = images[0]?.filename || ''

    return {
      id: folder.id,
      name: folder.name,
      displayName: folder.display_name,
      thumbnail: thumbnailFile ? getPublicUrl(folder.name, thumbnailFile) : '',
      images: images.map(img => getPublicUrl(folder.name, img.filename)),
      date: folder.date
    }
  })
}

/**
 * Get a single portfolio folder by name
 */
export async function fetchPortfolioFolder(folderName: string): Promise<PortfolioFolder | null> {
  const supabase = getSupabaseClient()

  const { data: folder, error } = await supabase
    .schema('portfolio')
    .from('folders')
    .select('*, images(*)')
    .eq('name', folderName)
    .single()

  if (error || !folder) {
    console.error(`Error fetching folder ${folderName}:`, error)
    return null
  }

  const images = (folder.images || []).sort((a: Image, b: Image) => a.order_index - b.order_index)
  const thumbnailFile = images[0]?.filename || ''

  return {
    id: folder.id,
    name: folder.name,
    displayName: folder.display_name,
    thumbnail: thumbnailFile ? getPublicUrl(folder.name, thumbnailFile) : '',
    images: images.map((img: Image) => getPublicUrl(folder.name, img.filename)),
    date: folder.date
  }
}
