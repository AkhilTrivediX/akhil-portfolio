import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono'
import './vinimastyles.css'

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    
    return (
        <main className={GeistSans.className+' '+GeistMono.variable+'dark text-foreground'}>{children}</main>
    )
  }