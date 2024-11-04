"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";

import styled from "styled-components";
import WeatherCard from "@/components/weatherCard";
import { Weather } from "@/app/interfaces/weather";

import Link from "next/link";

const WeatherContentWrapper = styled.main`
    width: 100%;
    margin: auto;
    background-color: lightgrey;
`;

const CityName = styled.h1`
    color: black;
    text-align: center;
`;

const WeatherCardsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    border: black 4px solid;
`;

export default function CityPage() {
    const params = useParams();

    const {data, error} = useSWR(`/api/getWeatherData?city=${params.city}`, (url) => fetch(url).then((res) => res.json()));

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>

    const days = data?.days || [];

    return (
        <WeatherContentWrapper>
            <Link href='/'>Return to Home</Link>
            <CityName>{params.city}</CityName>
            <WeatherCardsContainer>
                {
                    days.map((weather: Weather, i: number) => (
                        <WeatherCard
                            key={i}
                            datetime={weather.datetime}
                            conditions={weather.conditions}
                            description={weather.description}
                            tempmin={weather.tempmin}
                            tempmax={weather.tempmax}
                        />
                    ))
                }
            </WeatherCardsContainer>
        </WeatherContentWrapper>
    );
}