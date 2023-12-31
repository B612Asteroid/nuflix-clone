import {useQuery} from "react-query";
import {getMovies, IGetMovieResult} from "../api";
import styled from "styled-components";
import {makeImagePath} from "../utilities";


const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{bgPhoto: string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url("${props => props.bgPhoto}");
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 50px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`;

function Home() {
    const {data, isLoading} = useQuery<IGetMovieResult>(["movies", "nowPlaying"], getMovies);
    console.log(data, isLoading);
    return <Wrapper style={{height: "200vh"}}>
        {isLoading? (
            <Loader>Loading...</Loader>
        ) : (
            <>
                <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>
            </>
        )}
    </Wrapper>;
}

export default Home;