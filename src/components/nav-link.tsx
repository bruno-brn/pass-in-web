import { ComponentProps } from "react"

interface NavlinkProps extends ComponentProps<'a'>{
  children: string
}

export function Navlink(props: NavlinkProps) {
  return (
    <a {...props} className="font-medium text-sm">
      {props.children}
    </a>
  )
}
