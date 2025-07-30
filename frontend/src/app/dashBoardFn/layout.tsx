import Header from './components/header'
import Sidebar from './components/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '250px', marginTop: '5rem', padding: '2rem', width: '100%' }}>
          {children}
        </main>
      </div>
    </>
  )
}