import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
    const {
        data,
        isLoading,
        isError,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        'images',
        // AXIOS REQUEST WITH PARAM
        async ({pageParam = null}) => {
            const response = await api.get('/api/images', {
                params: {
                    after: pageParam,
                },
            });

            return response.data;
        }
        ,
        // GET AND RETURN NEXT PAGE PARAM
        {getNextPageParam: lastPage => (lastPage.after ? lastPage.after : null)}
    );

    const formattedData = useMemo(() => {
        if (!data)
            return [];
        // FORMAT AND FLAT DATA ARRAY
        return data.pages.map(page => page.data).flat();
    }, [data]);

    // RENDER LOADING SCREEN
    if(isLoading) {
        return <Loading />
    }

    // RENDER ERROR SCREEN
    if(isError) {
        return <Error />
    }

    return (
        <>
            <Header />

            <Box maxW={1120} px={20} mx="auto" my={20}>
                <CardList cards={formattedData} />
                {/* RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
                {hasNextPage && (
                    <Button mt="10" onClick={() => fetchNextPage()}>
                        {!isFetchingNextPage ? 'Carregar mais' : 'Carregando...'}
                    </Button>
                )}
            </Box>
        </>
    );
}
