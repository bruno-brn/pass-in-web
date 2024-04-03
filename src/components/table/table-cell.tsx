import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableCellprops extends ComponentProps<'td'>{

}

export function TableCell(props: TableCellprops) {
  return (
    <td {...props}className={twMerge('py-3 px-4 text-sm text-zinc-300')}/>
  )
}

