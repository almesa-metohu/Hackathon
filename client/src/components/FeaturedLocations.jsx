import { Box, Image, Flex } from "@chakra-ui/react";

import React from "react";

const property = {
    imageUrl: 'https://storage.googleapis.com/albania-travel-guide/2022/07/Vlore-Albania-Travel-Guide-44-960x540.jpg',
    imageAlt: 'Vlore',
    beds: 3,
    baths: 2,
    title: 'Vlore',
    formattedPrice: '~ 1200 ALL',
    reviewCount: 34,
    rating: 4,
  }


function FeaturedLocations() {
    return (
        <Flex>
            <Box maxW='xs' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p='6'>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as='span' color='gray.600' fontSize='sm'>
            / person
          </Box>
        </Box>
      </Box>
    </Box>
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p='6'>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as='span' color='gray.600' fontSize='sm'>
            / person
          </Box>
        </Box>
      </Box>
    </Box>
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p='6'>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as='span' color='gray.600' fontSize='sm'>
            / person
          </Box>
        </Box>
      </Box>
    </Box>
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p='6'>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as='span' color='gray.600' fontSize='sm'>
            / person
          </Box>
        </Box>
      </Box>
    </Box>
        </Flex>
        



    );
}

export default FeaturedLocations;