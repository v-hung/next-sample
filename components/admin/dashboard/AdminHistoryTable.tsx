"use client"

import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import Image from "next/image"
import { AdminHistoryState } from "@/app/admin/(admin)/page"
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { generatePaginationArray } from "@/lib/admin/pagination"
import { useAction, usePromise } from "@/lib/ultis/promise";
import dayjs from "dayjs";
import Drawer from "@/components/ui/Drawer";
import { TBody, THead, Table, Td, Tr } from "@/components/ui/Table";

const AdminHistoryTable = ({
  getAdminHistory
}: {
  getAdminHistory: (page?: number, per_page?: number) => Promise<{data: AdminHistoryState[], count: number}>
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AdminHistoryState[]>([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [maxPage, setMaxPage] = useState(1)
  const [listPage, setListPage] = useState<{
    title: string | number,
    active:boolean,
    link: number | null
  }[]>([])

  const fetchData = (page: number, perPage: number) => usePromise({
    loading,
    setLoading,
    showSuccessTitle: false,
    callback: async () => {
      const { data, count } = await useAction(() => getAdminHistory(page, perPage))

      const tempMaxPage = Math.ceil(count / perPage)

      setData(data)
      setMaxPage(tempMaxPage)
      
      setListPage(generatePaginationArray(tempMaxPage, page))
    }
  })

  useEffect(() => {
    fetchData(page, perPage)
  }, [page])

  // click data show details
  const [dataShow, setDataShow] = useState<AdminHistoryState | null>(null)
  const handelClickItem = (data: AdminHistoryState) => {
    setDataShow(data)
  }

  // prismjs hightlight
  useEffect(() => {
    Prism.highlightAll()
  }, [data])

  return (
    <>
      <section className='mt-4 relative'>
        <Table>
          <THead>
            <Tr>
              <Td>Thời gian</Td>
              <Td>Quản trị viên</Td>
              <Td>Trạng thái và ID</Td>
              <Td>Hành động</Td>
              <Td>Bảng</Td>
              <Td>Dữ liệu</Td>
            </Tr>
          </THead>
          <TBody>
            { data.length > 0
              ? data.map((v,i) =>
                <Tr key={v.id} onClick={() => handelClickItem(v)} className="hover:bg-blue-50 cursor-pointer">
                  <Td>
                    <ViewDateField value={v.createdAt} />
                  </Td>
                  <Td>
                    <div className="flex items-center space-x-2">
                      <div className={`w-12 h-12 rounded-full border-2 border-white overflow-hidden ${!v?.admin.image ? 'bg-blue-500' : ''} shadow grid place-items-center`}>
                        { v.admin.image?.url
                          ? <Image src={v.admin.image?.url} alt={`image profile ${v.admin.name}`} width={48} height={48} />
                          : <span className="icon icon-fill !text-white !text-3xl">
                            person
                          </span>
                        }
                      </div>
                      <div>
                        <p className="font-semibold">{v.admin.name}</p>
                        <p className="text-gray-600">{v.admin.email}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex items-center space-x-2">
                      <span className={`icon ${v.status == 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        {v.status == 'success' ? 'task_alt' : 'cancel'}
                      </span>
                      <p className="font-semibold">#{v.id}</p>
                    </div>
                  </Td>
                  <Td>
                    <div>
                      <p className="font-semibold">{v.action}</p>
                      <p className="mt-1">{v.title}</p>
                    </div>
                  </Td>
                  <Td className="!font-semibold !text-teal-600">{v.tableName || '...'}</Td>
                  <Td>
                    <pre className="line-clamp-3 !overflow-hidden max-w-md">
                      { v.data
                        ? <code className="language-js">
                          {v.data}
                        </code>
                        : '...'
                      }
                      
                    </pre>
                  </Td>
                </Tr>
              )
              : <Tr><Td colSpan={"100%" as any} className='!text-center'>Không có bản ghi nào</Td></Tr>
            }
          </TBody>
        </Table>

        { loading
          ? <div className="absolute top-0 left-0 w-full h-full grid place-items-center bg-white/60 z-10">
            <span className="icon animate-spin">progress_activity</span>
          </div>
          : null
        }
      </section>

      <TableItem data={dataShow} setData={setDataShow} />
    </>
  )
}

const ViewDateField = ({value}:{value: Date}) => {
  const date = dayjs(value)
  const formattedDate = date.format('YYYY-MM-DD')
  const formattedTime = date.format('HH:mm:ss')

  return <div className="whitespace-nowrap">
    <p className="text-sm">{formattedDate}</p>
    <p className='text-gray-500 text-xs'>{formattedTime}</p>
  </div>
}

const TableItem = ({
  data, setData
}: {
  data: AdminHistoryState | null,
  setData: Dispatch<SetStateAction<AdminHistoryState | null>>
}) => {
  const codeEl = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeEl.current && data) {
      Prism.highlightElement(codeEl.current)
    }
  }, [data])

  return (
    <>
      <Drawer
        anchor='right'
        open={data != null}
        onClose={() => setData(null)}
      >
        <div className='w-[600px] max-w-[100vw] flex flex-col h-full'>
          <div className="flex-none bg-gray-100 py-4 px-6">
            <h3 className='text-xl'>Thông tin lịch sử <span className="text-blue-600">{data?.id}</span></h3>
          </div>
          <div className="flex-grow min-h-0 overflow-y-auto py-6 px-6 flex flex-col space-y-6">
            <div>
              <p className="text-sm font-medium mb-1 capitalize">Quản trị viên</p>
              <div className="flex items-center space-x-2">
                <div className={`w-12 h-12 rounded-full border-2 border-white overflow-hidden ${!data?.admin.image ? 'bg-blue-500' : ''} shadow grid place-items-center`}>
                  { data?.admin.image?.url
                    ? <Image src={data.admin.image?.url} alt={`image profile ${data.admin.name}`} width={48} height={48} />
                    : <span className="icon icon-fill !text-white !text-3xl">
                      person
                    </span>
                  }
                </div>
                <div>
                  <p className="font-semibold">{data?.admin.name}</p>
                  <p className="text-gray-600">{data?.admin.email}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 items-stretch -mx-2">
              <div className="w-1/2 px-2 flex flex-col">
                <p className="flex-none text-sm font-medium mb-1 capitalize">Thời gian</p>
                <div className="flex-grow min-h-0 rounded bg-gray-100 p-2 -mx-2">
                  <div className="whitespace-nowrap">
                    <p className="text-base">{dayjs(data?.createdAt).format('YYYY-MM-DD')}</p>
                    <p className='text-gray-500 text-sm'>{dayjs(data?.createdAt).format('HH:mm:ss')}</p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 flex flex-col">
                <p className="flex-none text-sm font-medium mb-1 capitalize">Trạng thái và ID</p>
                <div className="flex-grow min-h-0 rounded bg-gray-100 p-2 -mx-2">
                  <div className="flex items-center space-x-2">
                    <span className={`icon ${data?.status == 'success' ? 'text-green-500' : 'text-red-500'}`}>
                      {data?.status == 'success' ? 'task_alt' : 'cancel'}
                    </span>
                    <p className="font-semibold">#{data?.id}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1 capitalize">Hành động</p>
              <div className="rounded bg-gray-100 p-2 -mx-2 text-sm">
                <p className="font-semibold">{data?.action}</p>
                <p className="mt-1">{data?.title}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1 capitalize">Bảng</p>
              <div className="rounded bg-gray-100 p-2 -mx-2">
                <p className="!font-semibold !text-teal-600">{data?.tableName || '...'}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-1 capitalize">Dữ liệu</p>
              <div className="rounded bg-gray-100 px-2 -mx-2">
                <pre>
                  { data?.data
                    ? <code ref={codeEl} className="language-js">
                      {data.data}
                    </code>
                    : '...'
                  }
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default AdminHistoryTable