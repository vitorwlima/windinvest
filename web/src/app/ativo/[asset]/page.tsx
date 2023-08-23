type PageParams = {
  params: {
    asset: string
  }
}

const AssetPage: React.FC<PageParams> = ({ params: { asset } }) => {
  return (
    <div>
      <h1>{asset}</h1>
    </div>
  )
}

export default AssetPage
