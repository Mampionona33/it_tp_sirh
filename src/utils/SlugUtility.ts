class SlugUtility {
  static slugify(text: string, spaceReplacement: '_' | '-'): string {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, spaceReplacement) // Replace spaces with the specified character
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  static slugifyWithPrefix(text: string, prefix: string): string {
    return `${prefix}-${this.slugify(text, '-')}`
  }

  static reverseSlugify(
    slug: string,
    spaceReplacement: '_' | '-',
    setToUppercase?: boolean,
    capitalize?: boolean,
    prefix?: string,
  ): string {
    let result = slug.replace(new RegExp(spaceReplacement, 'g'), ' ')

    if (!setToUppercase) {
      result = result.toUpperCase()
    }

    if (capitalize) {
      result = result.charAt(0).toUpperCase() + result.slice(1)
    }

    if (prefix) {
      result = `${prefix}-${result}`
    }

    return result
  }
}

export default SlugUtility
