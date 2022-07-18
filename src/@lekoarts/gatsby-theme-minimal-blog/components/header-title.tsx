/** @jsx jsx */
import { Link } from "gatsby"
import { Flex, jsx } from "theme-ui"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import logo from "../../../../static/icon.png"

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata()
  const { basePath } = useMinimalBlogConfig()

  return (
    <Link
      to={replaceSlashes(`/${basePath}`)}
      aria-label={`${siteTitle} - Back to home`}
      sx={{ color: `heading`, textDecoration: `none` }}
    >
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between` }}>
        <img src={logo} width={32} height={32} style={{ marginRight: "10px" }} />

        <div sx={{ my: 0, fontWeight: `medium`, fontSize: [3, 4] }}>{siteTitle}</div>
      </Flex>
    </Link>
  )
}

export default HeaderTitle
