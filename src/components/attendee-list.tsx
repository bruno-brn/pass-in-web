import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search} from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attedees'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
  const [search, setSeach] = useState("")
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(attendees.length/10)

  function onSeachInputChange(event: ChangeEvent<HTMLInputElement>){
    setSeach(event.target.value)
  }

  function goToNextPage(){
    setPage(page + 1)
  }

  function goToPreviousPage(){
    setPage(page - 1)
  }

  function goToFirstPge(){
    setPage(1)
  }

  function goTolastPge(){
    setPage(totalPages)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg flex items-center gap-3">
          <Search className='size-4 text-emerald-300'/>
          <input onChange={onSeachInputChange} className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm" placeholder="Buscar participante..." />
        </div>
        {search}
      </div>
        <Table>
          <thead>
            <tr className='border-b  border-white/10'>
              <TableHeader style={{width: 48}} className='py-3 px-4 text-sm font-semibold text-left'>
                <input type="checkbox" className='sixe-4 bg-black/20 rounded border border-white/10 accent-orange-400' />
              </TableHeader>
              <TableHeader >Código</TableHeader>
              <TableHeader >Participante</TableHeader>
              <TableHeader >Data de inscrição</TableHeader>
              <TableHeader >Data do check-in</TableHeader>
              <TableHeader style={{width: 64}} className='py-3 px-4 text-sm font-semibold text-left'></TableHeader>
            </tr>
          </thead>
          <tbody>
            {attendees.slice((page - 1) * 10, page * 10).map((attedee) => {
              return(
                <TableRow key={attedee.id} className='border-b border-white/10'>
                  <TableCell >
                    <div>
                      <input type="checkbox" className='sixe-4 bg-black/20 rounded border border-white/10 accent-orange-400' />
                    </div>
                  </TableCell>
                  <TableCell >123456</TableCell>
                  <TableCell >
                    <div className='flex flex-col gap-1'>
                      <span className='font-semibold text-white'>{attedee.name}</span>
                      <span>{attedee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell >{dayjs().to(attedee.createAt)}</TableCell>
                  <TableCell >{dayjs().to(attedee.checkedInAt)}</TableCell>
                  <TableCell >
                    <IconButton transparent={true}>
                      <MoreHorizontal className='size-4'/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <TableCell className='py-3 px-4 text-sm text-zinc-300' colSpan={3}>
                Mostrando 10 de {attendees.length}
              </TableCell>
              <td className='py-3 px-4 text-sm text-zinc-300 text-right' colSpan={3}>
              <div className='inline-flex items-center gap-8'>
                <span>Página {page} de {totalPages}</span>

                <div className='flex gap-1.5'>
                  <IconButton onClick={goToFirstPge} disabled={page === 1}>
                    <ChevronsLeft className='size-4'/>
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className='size-4'/>
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className='size-4'/>
                  </IconButton>
                  <IconButton onClick={goTolastPge} disabled={page === totalPages}>
                    <ChevronsRight className='size-4'/>
                  </IconButton>
                </div>
              </div>
              </td>
            </tr>
          </tfoot>
        </Table>
    </div>
  )
}
