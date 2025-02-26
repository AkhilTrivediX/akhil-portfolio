import { GeistSans } from 'geist/font/sans';
import './vinimastyles.css'

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    
    return (
        <main className={GeistSans.className+' dark text-foreground'}>{children}</main>
    )
  }