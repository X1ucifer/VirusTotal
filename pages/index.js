import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Search from '../components/Search'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Header></Header>

      <Search></Search>
    </>

  )
}
