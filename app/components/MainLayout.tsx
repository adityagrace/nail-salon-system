import Sidebar from './Sidebar';

interface MainLayoutProps{
    children: React.ReactNode;
}

export default function MainLayout ({children}: MainLayoutProps){
    return (
        <div className='flex'>
          <Sidebar/>
          <main className='flex-1 ml-64 p-8 bg-gray-100'>
                {children}
              </main>
        </div>
    );
}