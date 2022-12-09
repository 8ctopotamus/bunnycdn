import fetch from 'node-fetch'
import cheerio from 'cheerio'

const response = await fetch('https://en.wikipedia.org/wiki/Cache_performance_measurement_and_metric')

const html = await response.text()

const $ = cheerio.load(html)

console.log($('h1'))