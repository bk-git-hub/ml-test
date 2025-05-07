interface AdminProfileProps {
  name?: string;
  email?: string;
  imageUrl?: string;
}

export default function AdminProfile({
  name = '김말랑',
  email = 'example@email.com',
  imageUrl = '/logo.png',
}: AdminProfileProps) {
  return (
    <div className='p-2 flex items-center gap-2'>
      <img src={imageUrl} alt='Profile' className='w-10 h-10 rounded-full' />
      <div className='flex flex-col justify-center'>
        <h1 className='text-lg font-bold'>{name}</h1>
        <p className='text-sm text-gray-500'>{email}</p>
      </div>
    </div>
  );
}
