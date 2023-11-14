"use client"
import { AdminType, logoutAdmin } from '@/actions/admin/admin'
import { memo, useState, useTransition, useRef, MouseEvent } from 'react'
import { LinkState } from './AdminLayout'
import useAdminMenu from '@/stores/admin/admin_menu'
import { usePathname } from 'next/navigation'
import dayjs from 'dayjs'
import Dropdown, { Divide, MenuItem } from '../ui/Dropdown'
import Link from 'next/link'
import { useAction } from '@/lib/ultis/promise'

const HeaderAdmin = memo(({
  adminUser, managerLinks, generalLinks
}:{ 
  adminUser: NonNullable<AdminType>,
  managerLinks: LinkState[],
  generalLinks: LinkState[]
} ) => {
  const adminMenu = useAdminMenu()

  const pathname = usePathname()

  const linkCurrent = [...managerLinks, ...generalLinks].find(v => v.path == pathname)

  return (
    <div className='sticky top-0 w-full h-16 bg-white border-b z-50'>
      <div className="w-full h-full px-4 flex items-center space-x-4">
        <button 
          className="w-10 h-10 p-2 rounded-full bg-white hover:bg-gray-100"
          onClick={() => adminMenu?.toggle()}
        >
          <span className="icon">
            {adminMenu?.open ? 'menu_open' : 'menu'}
          </span>
        </button>

        <span className='rounded-full bg-gray-100 px-4 py-2'>{linkCurrent?.name || 'Bảng điều khiển'}</span>

        <div className="!ml-auto"></div>
        <Notification user={adminUser} />

        { adminUser != null
          ? <AvatarUser user={adminUser} />
          : null
        }
      </div>
    </div>
  )
})

const Notification = ({ user }: { user: AdminType}) => {
  const [loginDate, setLoginDate] = useState(new Date)

  return (
    <Dropdown
      renderItem={(rest) => (
        <button {...rest} className="relative w-10 h-10 p-2 rounded-full hover:bg-gray-100">
          <span className="icon">
            notifications
          </span>
          <div className="absolute w-2 h-2 rounded-full bg-orange-600 top-2 right-3"></div>
        </button>
      )}
      placement='bottom'
    >
      <div className="w-96 max-w-[100vw]">
        <div className="flex justify-between px-4 py-2 space-x-4 items-center border-b">
          <p className="font-medium">Thông báo</p>
          <span className="text-sm text-gray-600">Đánh dấu đã đọc</span>
        </div>
        <div className="flex flex-col divide-y">
          <div className="p-4 flex space-x-3 hover:bg-blue-100">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
              { user?.image
                ? <img src={user?.image.url} alt="" className='w-full h-full object-cover' loading='lazy' />
                : <span className="icon icon-fill !text-white !text-2xl">
                  person
                </span>
              }
            </div>

            <div className="flex flex-col space-y-1">
              <p><span className="font-medium">{user?.name}</span> chào mừng quay trở lại</p>
              <p className="text-sm text-gray-600">{dayjs(loginDate).format('DD/MM/yyyy h:mm:ss a')}</p>
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  )
}

const AvatarUser = ({ user }: { user: NonNullable<AdminType>}) => {
  
  const logout = (e: MouseEvent) => {
    e.preventDefault()
    useAction(logoutAdmin)
  }

  return (
    <Dropdown
      renderItem={(rest) => (
        <div 
          className="flex items-center space-x-2 rounded-full p-1 pr-2 bg-gray-100 hover:bg-gray-200 cursor-pointer select-none"
          {...rest}
        >
          <div className={`w-10 h-10 rounded-full overflow-hidden ${!user.image ? 'bg-blue-500' : ''} grid place-items-center`}>
            { user.image
              ? <img src={user.image.url} alt="" className='w-full h-full object-cover' loading='lazy' />
              : <span className="icon icon-fill !text-white !text-2xl">
                person
              </span>
            }
          </div>
          <div className='font-semibold'>{user.name}</div>
          <span className="icon icon-fill">
            arrow_drop_down
          </span>
        </div>
      )}
      placement='bottom'
    >
      <MenuItem LinkComponent={Link} href='/admin/profile' icon="person">Trang cá nhân</MenuItem>
      <Divide />
      <MenuItem onClick={logout}>
        <span className="icon icon-fill text-red-600">
          logout
        </span>
        <span className="text-red-600">Đăng xuất</span>
      </MenuItem>
    </Dropdown>
  )
}

export default HeaderAdmin