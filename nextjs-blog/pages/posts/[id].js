import Layout, { siteTitle } from '../../components/layout'
import { useRouter } from 'next/router'

import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


export default function Post({postData}) {
  const {title, id, date, contentHtml}  = postData
  const router = useRouter()
  const { pid } = router.query
  console.log("sssss", pid)
  return (
    <Layout>
      <Head>
        <title>{postData.title} | {siteTitle} {pid}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  const paths = getAllPostIds();
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
