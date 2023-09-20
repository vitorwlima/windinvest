import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AssetBase, useGetAllAssets } from 'src/queries/useGetAllAssets'
import { useDebounce } from './useDebounce'

export const useSearchAsset = () => {
  const { push } = useRouter()
  const path = usePathname()
  const ref = useRef<HTMLInputElement>(null)
  const [selected, setSelected] = useState<undefined | string>()
  const [inputValue, setInputValue] = useState('')

  const debouncedSearch = useDebounce(inputValue, 300)
  const { data } = useGetAllAssets({ search: debouncedSearch })
  const assetList =
    data !== undefined && data.ok ? data.data : ([] as AssetBase[])

  const onSelect = (value: string) => {
    setSelected(value)
    push(`/ativos/${value.toLowerCase()}`)
    ref.current?.blur()
  }

  useEffect(() => {
    if (path.includes('ativos')) {
      const asset = path.split('/')[2]
      setSelected(asset.toUpperCase())
    } else {
      setSelected(undefined)
      setInputValue('')
    }
  }, [path])

  return {
    selected,
    onSelect,
    inputValue,
    onInputChange: (value: string) => setInputValue(value),
    ref,
    assetList,
  }
}
