import { supabase } from './supabase'

/**
 * Upload an image file to Supabase storage
 */
export async function uploadImage(
  file: File,
  folderName: string,
  orderIndex: number
): Promise<{ success: boolean; error?: string; filename?: string }> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${String(orderIndex + 1).padStart(2, '0')}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('portfolio')
      .upload(`${folderName}/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading image:', error)
      return { success: false, error: error.message }
    }

    return { success: true, filename: fileName }
  } catch (err) {
    console.error('Unexpected error uploading image:', err)
    return { success: false, error: 'Unexpected error occurred' }
  }
}

/**
 * Upload multiple images for a folder
 */
export async function uploadFolderImages(
  files: File[],
  folderName: string
): Promise<{ success: boolean; uploaded: number; errors: number }> {
  let uploaded = 0
  let errors = 0

  for (let i = 0; i < files.length; i++) {
    const result = await uploadImage(files[i], folderName, i)
    if (result.success) {
      uploaded++
    } else {
      errors++
    }
  }

  return { success: true, uploaded, errors }
}

/**
 * Delete an image from storage
 */
export async function deleteImage(folderName: string, filename: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('portfolio')
      .remove([`${folderName}/${filename}`])

    if (error) {
      console.error('Error deleting image:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Unexpected error deleting image:', err)
    return false
  }
}
