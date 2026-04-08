const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('❌ Missing env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false }
});

async function syncPortfolio() {
  console.log('🔍 Scanning portfolio bucket...\n');

  // List all folders in the portfolio bucket
  const { data: files, error } = await supabase
    .storage
    .from('portfolio')
    .list('', { limit: 1000 });

  if (error) {
    console.error('❌ Error listing storage:', error);
    return;
  }

  // Filter to get folders only (not individual files)
  const folders = files.filter(f => f.id === null); // Folders have null id

  console.log(`📁 Found ${folders.length} folders\n`);

  for (const folder of folders) {
    const folderName = folder.name;

    // Extract date from folder name (assumes format: aqiqah-name-DD-MMM-YYYY)
    const dateMatch = folderName.match(/(\d{1,2})-(\w+)-(\d{4})/);
    let isoDate = null;
    let displayName = folderName.replace(/-/g, ' ');

    if (dateMatch) {
      const [_, day, month, year] = dateMatch;
      const monthMap = {
        'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
        'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
        'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
      };
      const monthNum = monthMap[month.toLowerCase()];
      if (monthNum) {
        isoDate = `${year}-${monthNum}-${day.padStart(2, '0')}`;
      }
    }

    // Insert folder into database
    const { data: insertedFolder, error: folderError } = await supabase
      .from('folders')
      .upsert({
        name: folderName,
        display_name: displayName,
        date: isoDate
      }, { onConflict: 'name' })
      .select()
      .single();

    if (folderError) {
      console.error(`❌ Error inserting folder ${folderName}:`, folderError);
      continue;
    }

    console.log(`✅ Folder: ${displayName}`);

    // List images in this folder
    const { data: images, error: imagesError } = await supabase
      .storage
      .from('portfolio')
      .list(folderName, { limit: 100 });

    if (imagesError) {
      console.error(`❌ Error listing images in ${folderName}:`, imagesError);
      continue;
    }

    // Filter out non-image files and sort
    const imageFiles = images
      .filter(f => f.name.match(/\.(jpg|jpeg|png|webp)$/i))
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log(`   📷 Found ${imageFiles.length} images`);

    // Insert images
    for (let i = 0; i < imageFiles.length; i++) {
      const image = imageFiles[i];

      const { error: imageError } = await supabase
        .from('images')
        .upsert({
          folder_id: insertedFolder.id,
          filename: image.name,
          file_size: image.metadata?.size || 0,
          order_index: i + 1
        }, { onConflict: 'folder_id,order_index' });

      if (imageError) {
        console.error(`   ❌ Error inserting ${image.name}:`, imageError);
      }
    }

    console.log(`   ✅ Synced ${imageFiles.length} images\n`);
  }

  console.log('🎉 Sync complete!');
}

syncPortfolio().catch(console.error);
