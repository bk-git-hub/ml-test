import React, { useState } from 'react';

type OrderStatus =
  | 'PENDING'
  | 'PREPARING'
  | 'READY'
  | 'COMPLETED'
  | 'CANCELLED';

interface Order {
  id: string;
  orderNumber: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'ALL'>(
    'ALL'
  );

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders =
    selectedStatus === 'ALL'
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-gray-900'>주문 관리</h1>
        <div className='flex space-x-2'>
          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as OrderStatus | 'ALL')
            }
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
          >
            <option value='ALL'>전체</option>
            <option value='PENDING'>대기중</option>
            <option value='PREPARING'>준비중</option>
            <option value='READY'>준비완료</option>
            <option value='COMPLETED'>완료</option>
            <option value='CANCELLED'>취소</option>
          </select>
        </div>
      </div>

      <div className='bg-white shadow overflow-hidden sm:rounded-md'>
        {filteredOrders.length === 0 ? (
          <div className='px-6 py-4 text-center text-gray-500'>
            주문 내역이 없습니다.
          </div>
        ) : (
          <ul className='divide-y divide-gray-200'>
            {filteredOrders.map((order) => (
              <li key={order.id} className='px-6 py-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center'>
                      <p className='text-sm font-medium text-gray-900'>
                        주문번호: {order.orderNumber}
                      </p>
                      <span className='ml-2 text-sm text-gray-500'>
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className='mt-2'>
                      {order.items.map((item, index) => (
                        <p key={index} className='text-sm text-gray-500'>
                          {item.name} x {item.quantity} -{' '}
                          {item.price.toLocaleString()}원
                        </p>
                      ))}
                    </div>
                    <p className='mt-2 text-sm font-medium text-gray-900'>
                      총 금액: {order.totalAmount.toLocaleString()}원
                    </p>
                  </div>
                  <div className='ml-4'>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as OrderStatus
                        )
                      }
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ml-yellow focus:ring-ml-yellow sm:text-sm'
                    >
                      <option value='PENDING'>대기중</option>
                      <option value='PREPARING'>준비중</option>
                      <option value='READY'>준비완료</option>
                      <option value='COMPLETED'>완료</option>
                      <option value='CANCELLED'>취소</option>
                    </select>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
