import { mapSeoMetaOptions } from '~/helpers/seo'

export function addSeoToHead ({
  data,
  route,
  config,
  overrideFullTitle = false,
  imageCropName = 'meta',
}) {
  const links = { canonical: `${config.public.siteUrl}${route.path}` }

  useHead(() =>
    mapSeoMetaOptions(
      data.value?.title ?? data.title,
      data.value?.summary ?? data.summary,
      data.value?.primaryImage ?? data.primaryImage,
      links,
      overrideFullTitle,
      imageCropName,
    ),
  )
}

export default addSeoToHead
