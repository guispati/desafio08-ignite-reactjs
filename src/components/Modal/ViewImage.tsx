import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Image,
    Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
    isOpen: boolean;
    onClose: () => void;
    imgUrl: string;
}

export function ModalViewImage({
    isOpen,
    onClose,
    imgUrl,
}: ModalViewImageProps): JSX.Element {
    // MODAL WITH IMAGE AND EXTERNAL LINK
    const handleCloseModal = (): void => {
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="4xl">
            <ModalOverlay />
            <ModalContent>
                <ModalBody px={60}>
                    <Image src={imgUrl} maxW="900px" maxH="600px" h="100%" w="100%" objectFit="contain" />
                </ModalBody>
                <ModalFooter bgColor="pGray.800" justifyContent="flex-start">
                    <Link href={imgUrl} target="_blank">
                        Abrir original
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
    
}
