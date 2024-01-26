import Gallery from '../components/Gallery'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { QUERY_ME } from '../utils/queries'

export default function Dashboard() {

    const { loading, data } = useQuery(QUERY_ME)
    console.log(data)
    const user = data?.me || {}

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h2>Welcome, {user.firstName}</h2>
            <div>
                {user.icons ? (
                    <Gallery
                        images={user.icons}
                    ></Gallery>
                ) : (
                    <>
                        <h3>No images created yet! Click below to generate some now!</h3>
                        <Link
						    color='foreground'
						    href='/generate'>
						    Generate
					    </Link>
                    </>
                )}
            </div>
        </div>
    )
}