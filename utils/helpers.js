const generateSlug = (sentences) => {
    const slug = sentences.toLowerCase().replace(/ /g, '-')
    return slug
}

module.exports = { generateSlug }