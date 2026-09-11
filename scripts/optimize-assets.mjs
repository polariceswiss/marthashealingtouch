import sharp from 'sharp';
for (const [source,target,width] of [['hero-source.png','hero-cinematic.webp',1920],['facial-source.png','facial-editorial.webp',1100],['massage-source.jpg','massage-editorial.webp',1100]]){await sharp('public/images/'+source).resize({width,withoutEnlargement:true}).webp({quality:88}).toFile('public/images/'+target);}
console.log('Optimized three editorial assets');
