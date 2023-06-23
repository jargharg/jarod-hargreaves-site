export function mapSeoMetaOptions (
  title,
  description,
  imageField,
  links = {},
  overrideFullTitle = false,
  imageCropName = 'meta',
) {
  const siteName = 'Phil Hargreaves Photography'
  const titleString = overrideFullTitle ? title : `${title} | ${siteName}`

  const meta = [
    {
      hid: 'name',
      name: 'name',
      content: siteName,
    },
    {
      hid: 'title',
      name: 'title',
      content: titleString,
    },
    {
      hid: 'og:sitename',
      name: 'og:sitename',
      content: siteName,
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: titleString,
    },
  ]

  if (description) {
    meta.push(
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: description,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description,
      },
    )
  }

  if (imageField && imageCropName in imageField && Object.keys(imageField[imageCropName]).length > 0) {
    meta.push(
      {
        hid: 'image',
        name: 'image',
        content: imageField[imageCropName]?.url || '',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: imageField[imageCropName]?.url || '',
      },
      {
        hid: 'og:image:width',
        name: 'og:image:width',
        content: imageField[imageCropName]?.dimensions?.width || '',
      },
      {
        hid: 'og:image:height',
        name: 'og:image:height',
        content: imageField[imageCropName]?.dimensions?.height || '',
      },
      {
        hid: 'og:image:alt',
        name: 'og:image:alt',
        content: imageField[imageCropName]?.alt || imageField.alt || '',
      },
    )
  }

  const link = []
  if (links.canonical) {
    link.push({ rel: 'canonical', href: links.canonical })
  }

  return {
    title: titleString,
    meta,
    link,
  }
}
