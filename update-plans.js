const fs = require('fs');

const filePath = './src/pages/admin4/appstore.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Enterprise apps
const enterpriseApps = ['SEO Tools', 'Better Assistant', 'Sorena', 'deadpixel.ai'];
// Pro apps  
const proApps = ['Fullstory Integration', 'Hotjar Integration'];
// Enterprise addons
const enterpriseAddons = ['JWT Single Sign-on', 'SAML Single Sign-on'];

// Add plan to apps
enterpriseApps.forEach(name => {
    const regex = new RegExp(`(name: "${name}",\\s+description: "[^"]+",\\s+(?:logo: [^,]+,\\s+)?(?:initials: "[^"]+",\\s+)?installed: (?:true|false),)`, 'g');
    content = content.replace(regex, `$1\n        plan: 'enterprise' as PlanType,`);
});

proApps.forEach(name => {
    const regex = new RegExp(`(name: "${name}",\\s+description: "[^"]+",\\s+logo: [^,]+,\\s+installed: (?:true|false),)`, 'g');
    content = content.replace(regex, `$1\n        plan: 'pro' as PlanType,`);
});

// Add plan:'all' to all items that don't have plan
content = content.replace(/(installed: (?:true|false),)(\s+\},)/g, (match, p1, p2) => {
    if (!match.includes('plan:')) {
        return `${p1}\n        plan: 'all' as PlanType,${p2}`;
    }
    return match;
});

// Add plan to addons
enterpriseAddons.forEach(name => {
    const regex = new RegExp(`(name: "${name}",\\s+description: "[^"]+",\\s+logo: [^,]+,\\s+(?:price: "[^"]+",\\s+)?installed: (?:true|false),)`, 'g');
    content = content.replace(regex, `$1\n        plan: 'enterprise' as PlanType,`);
});

fs.writeFileSync(filePath, content);
console.log('Plans added successfully!');
