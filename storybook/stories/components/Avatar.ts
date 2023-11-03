import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import Pig from '../assets/image/pig.jpg'
export type AvatarProps = VariantProps<typeof avatar> & { textContent?: string; wrapperClassName?: string }

// export const allTypes = typePrefix('avatar-')

const avatar = cva(['avatar'], {
  variants: {},
  defaultVariants: {}
})

export const createAvatar = (props: AvatarProps) => {
  const div = document.createElement('div')
  div.className = avatar(props)
  const wrapperDiv = document.createElement('div')
  wrapperDiv.className = props.wrapperClassName ?? 'w-24 rounded'
  const img = document.createElement('img')
  wrapperDiv.append(img)
  img.src = Pig
  div.append(wrapperDiv)
  return div
}
