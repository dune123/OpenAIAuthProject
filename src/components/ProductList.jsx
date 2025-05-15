import React, { useState } from "react";
import ProductCardSkeleton from "./ProductSkeleton";

function ImageWithFallback({ item }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = item.original || item.source;

  return imageUrl && !imgError ? (
    <img
      src={imageUrl}
      alt={item.title}
      className="h-20 w-20 rounded-md"
      onError={() => setImgError(true)}
    />
  ) : (
    <div className="h-20 w-20 bg-gray-300 rounded-md flex items-center justify-center">
      <span className="text-gray-500 text-sm">No Image</span>
    </div>
  );
}

function ImageWithFallback2({ item }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = item.thumbnail || item.link;

  return imageUrl && !imgError ? (
    <img
      src={imageUrl}
      alt={item.title}
      className="h-20 w-20 rounded-md"
      onError={() => setImgError(true)}
    />
  ) : (
    <div className="h-20 w-20 bg-gray-300 rounded-md flex items-center justify-center">
      <span className="text-gray-500 text-sm">No Image</span>
    </div>
  );
}

const ProductList = ({ imageResponse, textResponse }) => {
  const arr = [
    {
      source:
        "https://www.canvasetc.com/product/7-oz-blue-canvas-fabric-60-blue/",
      thumbnail:
        "https://serpapi.com/searches/6825bb28b463f38f7922a…a2722dcbd852559dfe064e0b55ad2cb2ff58c5216983.jpeg",
      original:
        "https://www.canvasetc.com/wp-content/uploads/2018/10/5401_60_DBLUE.jpg",
      title: '7 oz Blue Canvas Fabric | 60" Width | Blue',
      source_name: "Canvas ETC",
    },
    {
      source:
        "https://global.sunbrella.com/en-us/fabrics/item/119/5424-0000/Canvas-Sky-Blue",
      thumbnail:
        "https://serpapi.com/searches/6825bb28b463f38f7922a…4fe9c204a338968d895813dba4bcf111eaa9a5413bbc.jpeg",
      original:
        "https://cdn.glenraven.net/_img/_rasterize.php?src=…/_img/showroom/fabrics/Swatch/5424-0000.jpg&w=950",
      title: "Canvas Sky Blue 5424-0000 Sunbrella fabric",
      source_name: "Sunbrella - Sunbrella Fabric",
    },
    {
      source: "https://www.moma.org/collection/works/80103",
      thumbnail:
        "https://serpapi.com/searches/6825bb28b463f38f7922a…ee900a1d9ebfd308db0439c42869eb647c78f376e214.jpeg",
      original:
        "https://www.moma.org/media/W1siZiIsIjUxOTc3MyJdLFs…IwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=a5baa1ae27d23953",
      title: "Yves Klein. Blue Monochrome. 1961 | MoMA",
      source_name: "MoMA",
    },

    {
      source:
        "https://photos.com/featured/royal-blue-textured-background-shutterworx.html?product=canvas-print",
      thumbnail:
        "https://serpapi.com/searches/6825bb28b463f38f7922a…892f976f702d691834919aaaf8b31162c8a4c2dc47d3.jpeg",
      original:
        "https://render.fineartamerica.com/images/rendered/…-textured-background-shutterworx-canvas-print.jpg",
      title: "Royal Blue Textured Background Canvas Print",
      source_name: "Photos.com by Getty Images",
    },
    {
      source:
        "https://www.amazon.com/Canvas-Duck-Fabric-Dyed-Solid/dp/B0155P8U4W",
      thumbnail:
        "https://serpapi.com/searches/6825bb28b463f38f7922a…d9510beeac0903f5266f037a47c02e03aec2082239f8.jpeg",
      original: "https://m.media-amazon.com/images/I/71JId6LF9GL.jpg",
      title:
        'Amazon.com: Canvas Duck Fabric 10 oz Dyed Solid Na…4" Wide/Sold  by The Yard : Arts, Crafts & Sewing',
      source_name: "Amazon.com",
    },
    {
      source: "https://www.istockphoto.com/photos/blue-canvas",
      thumbnail:
        "https://serpapi.com/searches/6825bb28b463f38f7922a…10f0097731da130060b69be4d8b402ebbf0e32dd44c0.jpeg",
      original:
        "https://media.istockphoto.com/id/1155677871/photo/…20&c=7iocQDvEO5--SBcUyDZyOVXeWM2RP9NF0Tvd5kL39LA=",
      title: "118,000+ Blue Canvas Stock Photos, Pictures & Royalty-Free ...",
      source_name: "iStock",
    },
    {
      source:
        "https://www.etsy.com/listing/1230471639/blue-plaster-art-large-blue-abstract",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:AN…DDEnwKJw_oPzhK44NE953rgjo2diQgKay3uh5GTqi16YXH0&s",
      original:
        "https://i.etsystatic.com/23898885/r/il/94c2dc/6146393110/il_570xN.6146393110_2l1p.jpg",
      title: "Blue Plaster Art Large Blue Abstract Painting Blue Canvas ...",
      source_name: "Etsy",
    },
    {
      source: "https://www.istockphoto.com/photos/blue-canvas",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:AN…UWQvZoqxafeW5NKFwIT1_RLc-xODxUOvEZ7BWTYx0hyGb5o&s",
      original:
        "https://media.istockphoto.com/id/496113307/photo/d…20&c=yGoEcsjZuunRzPh7dju2Jf_y5viHWDQaoioct4lWnLI=",
      title: "118,000+ Blue Canvas Stock Photos, Pictures & Royalty-Free ...",
      source_name: "iStock",
    },
    {
      source:
        "https://www.freepik.com/free-photos-vectors/blue-canvas-background",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:AN…1pQejT25GeFw3Y5gWRD4wSE3rFODGaQJpL3IRvqraKGIVf4&s",
      original:
        "https://img.freepik.com/free-photo/blue-paperboard-texture_1409-1329.jpg?semt=ais_hybrid&w=740",
      title: "Blue Canvas Background Images - Free Download on Freepik",
      source_name: "Freepik",
    },
    {
      source: "https://www.gettyimages.com/photos/blue-canvas",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:AN…_9jkgOWSScU582JsrwBJucRITqy6HaFgjNIyLHuVo4mZ9bI&s",
      original:
        "https://media.gettyimages.com/id/160306021/photo/j…20&c=lsaOFGdtTASzzbWcnfF9ySGq9-Cig2H2sfGMC6uP8Yk=",
      title: "13,000 Blue Canvas Stock Photos, High-Res Pictures, and ...",
      source_name: "Getty Images",
    },
    {
      source:
        "https://www.amazon.com/Canvas-Duck-Fabric-Solid-ROYAL/dp/B0155P8R72",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:AN…C27-yvEI-NXHwkYVNRiYTfp3cfHrlpCJdSFcuysFj4PH90A&s",
      original:
        "https://images-na.ssl-images-amazon.com/images/I/71vnPuX7faL._AC_UL210_SR210,210_.jpg",
      title:
        'Amazon.com: Canvas Duck Fabric 10 oz Dyed Solid Ro…4" Wide/Sold  by The Yard : Arts, Crafts & Sewing',
      source_name: "Amazon.com",
    },
    {
      source: "https://klinecollective.com/collections/blue-wall-art",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:AN…5DZGRcD_xy04BUaL0aY2QHVzj0OTlabKrNKyVsek4J-YUVg&s",
      original:
        "https://klinecollective.com/cdn/shop/files/Emergence3.jpg?v=1687855740&width=1100",
      title: "Blue Canvas Paintings | Shop Large Blue Wall Art – Kline ...",
      source_name: "Kline Collective",
    },
  ];

  const arr1 = [
    {
      position: 1,
      title: "Plimsoll (shoe) - Wikipedia",
      link: "https://en.wikipedia.org/wiki/Plimsoll_(shoe)",
      redirect_link:
        "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://en.wikipedia.org/wiki/Plimsoll_(shoe)&ved=2ahUKEwjC4v-IlqWNAxU-SDABHWz2NwkQFnoECAsQAQ",
      displayed_link: "https://en.wikipedia.org › wiki › Plimsoll_(shoe)",
      favicon:
        "https://serpapi.com/searches/6825b5201cff194e7dca1b6d/images/32d6bcdc2cf7638515c66d66d7bedcc0244a750ee36ac864.png",
      snippet:
        'The shoe originated in the United Kingdom, there called a "sand shoe", acquiring the nickname "plimsoll" in the 1870s.',
      snippet_highlighted_words: ["plimsoll"],
      source: "Wikipedia",
    },
    {
      position: 2,
      title: "What is a Plimsoll line? - NOAA's National Ocean Service",
      link: "https://oceanservice.noaa.gov/facts/plimsoll-line.html",
      redirect_link:
        "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://oceanservice.noaa.gov/facts/plimsoll-line.html&ved=2ahUKEwjC4v-IlqWNAxU-SDABHWz2NwkQFnoECAoQAQ",
      displayed_link: "https://oceanservice.noaa.gov › facts › plimsoll-line",
      favicon:
        "https://serpapi.com/searches/6825b5201cff194e7dca1b6d/images/32d6bcdc2cf7638582427e5af56263bf7e4cd61290b31068.png",
      date: "Jun 16, 2024",
      snippet:
        "A commercial ship is properly loaded when the ship's waterline equals the ship's Plimsoll line. ... Plimsoll mark on the hull of a floating ship.",
      snippet_highlighted_words: ["Plimsoll", "Plimsoll"],
      source: "NOAA's National Ocean Service (.gov)",
    },
    {
      position: 3,
      title: "Buy Levi's Mens Piper Beige/Navy Casual Sneakers",
      link: "https://www.amazon.in/Levis-mens-PIPER-Casual-Sneakers/dp/B0CXY4GBG4",
      redirect_link:
        "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.amazon.in/Levis-mens-PIPER-Casual-Sneakers/dp/B0CXY4GBG4&ved=2ahUKEwjC4v-IlqWNAxU-SDABHWz2NwkQFnoECBAQAQ",
      displayed_link: "https://www.amazon.in › Levis-mens-PIPER-Casual-Sne...",
      thumbnail:
        "https://serpapi.com/searches/6825b5201cff194e7dca1b6d/images/32d6bcdc2cf7638578bc02ca9c701fdbe14c338d0e68982d9272390b58bf1bd1.jpeg",
      favicon:
        "https://serpapi.com/searches/6825b5201cff194e7dca1b6d/images/32d6bcdc2cf7638578bc02ca9c701fdb768c1ce65ca7047f.png",
      snippet:
        "Buy Levi's Mens Piper Beige/Navy Casual Sneakers - 6 UK (87970-0132) from Sneakers at Amazon.in. 30 days free exchange or return.",
      source: "Amazon.in",
    },
    {
      position: 4,
      title:
        "Levi's पुरुषों के लिए PIPER कैज़ुअल स्नीकर्स, बेज/नेवी - Amazon.in",
      link: "https://www.amazon.in/-/hi/Levis-%E0%A4%AA%E0%A5%81%E0%A4%B0%E0%A5%81%E0%A4%B7%E0%A5%8B%E0%A4%82-PIPER-%E0%A4%95%E0%A5%88%E0%A4%9C%E0%A4%BC%E0%A5%81%E0%A4%85%E0%A4%B2-%E0%A4%B8%E0%A5%8D%E0%A4%A8%E0%A5%80%E0%A4%95%E0%A4%B0%E0%A5%8D%E0%A4%B8/dp/B0CXY4GBG4",
      redirect_link:
        "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.amazon.in/-/hi/Levis-%25E0%25A4%25AA%25E0%25A5%2581%25E0%25A4%25B0%25E0%25A5%2581%25E0%25A4%25B7%25E0%25A5%258B%25E0%25A4%2582-PIPER-%25E0%25A4%2595%25E0%25A5%2588%25E0%25A4%259C%25E0%25A4%25BC%25E0%25A5%2581%25E0%25A4%2585%25E0%25A4%25B2-%25E0%25A4%25B8%25E0%25A5%258D%25E0%25A4%25A8%25E0%25A5%2580%25E0%25A4%2595%25E0%25A4%25B0%25E0%25A5%258D%25E0%25A4%25B8/dp/B0CXY4GBG4&ved=2ahUKEwjC4v-IlqWNAxU-SDABHWz2NwkQFnoECA8QAQ",
      displayed_link: "https://www.amazon.in › Levis-पु...",
      thumbnail:
        "https://serpapi.com/searches/6825b5201cff194e7dca1b6d/images/32d6bcdc2cf76385829a5c79d2abfac7d0accae8f5b329f063ae7eeef3c9b618.jpeg",
      favicon:
        "https://serpapi.com/searches/6825b5201cff194e7dca1b6d/images/32d6bcdc2cf76385829a5c79d2abfac7bfa2fbca36679e88.png",
      snippet:
        "ऑर्डर की क्वान्टिटी प्रति ग्राहक 3 यूनिट तक सीमित है.. कृपया ध्यान दें कि मात्रा सीमा से अधिक होने वाले ऑर्डर खुद ही कैंसल हो जाएंगे. यह सभी विक्रेताओं पर लागू होता है.",
      source: "Amazon.in",
    },
  ];
  console.log(imageResponse, textResponse);
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="border-2 rounded-md p-4 flex flex-col gap-2">
        {textResponse&&textResponse.length > 0 ? (
          textResponse.map((item, index) => (
            <div className="border-2 rounded-md p-2 flex gap-6">
              <ImageWithFallback item={item} />
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold">{item.source_name}</p>
                <p>{item.title}</p>
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline"
                >
                  View Product
                </a>
              </div>
            </div>
          ))
        ) : (
          <div>Can not get any product</div>
        )}
        {imageResponse&&imageResponse.length > 0 ? (
          imageResponse.map((item, index) => (
            <div className="border-2 rounded-md p-2 flex gap-6">
              <ImageWithFallback2 item={item} />
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold">{item.source_name}</p>
                <p>{item.title}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:underline"
                >
                  View Product
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-red-500">
            Can not able to fetch details thoright image please try again with a
            different image
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductList);
