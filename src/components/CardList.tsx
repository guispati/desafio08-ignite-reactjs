import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
    title: string;
    description: string;
    url: string;
    ts: number;
    id: string;
}

interface CardsProps {
    cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
    // MODAL USEDISCLOSURE
    const { isOpen, onClose, onOpen } = useDisclosure();

    // SELECTED IMAGE URL STATE
    const [selectedImgUrl, setSelectedImgUrl] = useState('');

    // FUNCTION HANDLE VIEW IMAGE
    function handleViewImage(url: string) {
        setSelectedImgUrl(url);
        onOpen();
    }

    return (
        <>
            {/* CARD GRID */}
            <SimpleGrid columns={3} gridGap="10">
                {cards.map(card => {
                    return <Card key={card.id} data={card} viewImage={handleViewImage} />
                })}
            </SimpleGrid>

            {/* MODALVIEWIMAGE */}
            <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={selectedImgUrl} />
        </>
    );
}
