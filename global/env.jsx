const apple_store = (lang) => { return `https://www.apple.com/${lang}/app-store/` }
const google_store = () => { return `https://play.google.com/` }
const gallery_store = () => { return `https://appgallery.huawei.com/` }

export default {
    base_url: 'https://api.burabak.com',
    google_store: google_store,
    apple_store: apple_store,
    gallery_store: gallery_store,
}