const API_ACCESSTOKEN = 'API KEY/ACCESS TOKEN TIDAK BOLEH DISEBAR LUASKAN'
// SILAHKAN BUAT AKUN themoviedb dan dapatkan API Key Lalu masukkan API Key Access Token ke variabel API_ACCESSTOKEN

const API_BASEURL = 'https://api.themoviedb.org/3/'
const API_IMAGE_BASEURL = 'https://image.tmdb.org/t/p/original/'

const bulanId = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const genreData = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
]

const genreMap = new Map()
genreData.forEach(genre=>{
    genreMap.set(genre.id,genre.name)
})

const getPopularMovies = async ()=>{
    const endpoint = `${API_BASEURL}/movie/popular?language=id-ID&page=1`
    const response = await fetch(endpoint,{
        method: 'GET',
        headers:{
            'authorization': `Bearer ${API_ACCESSTOKEN}`
        }
    })
    return response.json()
}

const getTopRatedMovies = async ()=>{
    const endpoint = `${API_BASEURL}/movie/top_rated?language=id-ID&page=1`
    const response = await fetch(endpoint,{
        method: 'GET',
        headers:{
            'authorization': `Bearer ${API_ACCESSTOKEN}`
        }
    })
    return response.json()
}

getPopularMovies().then((result)=>{
    console.log(result)
})

getPopularMovies().then(({results})=>{
    const container = document.querySelector('#popular-movies .movies-container')
    container.innerHTML = ""
    results.forEach((val)=>{

        const date = new Date(val.release_date)
        val.release_date = `${date.getDate().toString().padStart(2,'0')} ${bulanId[date.getMonth()]} ${date.getFullYear()}`
        val.genre_ids = val.genre_ids.map((id)=>{
            return genreMap.get(id)
        })

        const el = `
        <div class="movie-item">
            <div class="d-flex justify-content-center align-items-center">
                <img src="${API_IMAGE_BASEURL}${val.poster_path}" alt="${val.orginal_title} Poster" class="news-image">
            </div>
            <div class="d-flex flex-column py-2">
                <div class="d-flex gap-2">
                    <h2 class="text-white fm-primary fw-bold text-ellipsis-3 fs-5 m-0">${val.original_title}</h2>
                </div>
                <div class="d-flex text-light gap-2 justify-content-between" style="font-size: 15px;">
                    <div class="d-flex gap-2">
                        <span>${val.genre_ids[0]}</span>
                        <span class="fw-light text-warning">(${val.vote_average}★)</span>
                    </div>
                    <span>${val.release_date}</span>
                </div>
            </div>
        </div>
        `

        container.innerHTML += el
    })
})

getTopRatedMovies().then(({results})=>{
    const container = document.querySelector('#top-rated-movies .movies-container')
    container.innerHTML = ""
    results.forEach((val)=>{

        const date = new Date(val.release_date)
        val.release_date = `${date.getDate().toString().padStart(2,'0')} ${bulanId[date.getMonth()]} ${date.getFullYear()}`
        val.genre_ids = val.genre_ids.map((id)=>{
            return genreMap.get(id)
        })

        const el = `
        <div class="movie-item">
            <div class="d-flex justify-content-center align-items-center">
                <img src="${API_IMAGE_BASEURL}${val.poster_path}" alt="${val.orginal_title} Poster" class="news-image">
            </div>
            <div class="d-flex flex-column py-2">
                <div class="d-flex gap-2">
                    <h2 class="text-white fm-primary fw-bold text-ellipsis-3 fs-5 m-0">${val.original_title}</h2>
                </div>
                <div class="d-flex text-light gap-2 justify-content-between" style="font-size: 15px;">
                    <div class="d-flex gap-2">
                        <span>${val.genre_ids[0]}</span>
                        <span class="fw-light text-warning">(${val.vote_average}★)</span>
                    </div>
                    <span>${val.release_date}</span>
                </div>
            </div>
        </div>
        `

        container.innerHTML += el
    })
})