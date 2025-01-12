"use client";

import AddCard from "@/components/add-card";
import CardsList from "@/components/card-list";
import OfferList from "@/components/offer-list";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OfferType } from "@/types/types";

const offer: OfferType = {
  id: 1,
  offeringUserId: 1,
  offeredCards: [
    { id: 1, name: "a", set: "a", imageUri: "https://picsum.photos/200/300" },
  ],
  requestedCards: [
    { id: 2, name: "b", set: "b", imageUri: "https://picsum.photos/200/300" },
  ],
};

const Offers = () => {
  return (
    <Container>
      <Tabs defaultValue="recieved" className="w-[100%] dark">
        <TabsList className="w-[100%]">
          <TabsTrigger value="recieved" className="w-[100%]">
            Recieved
          </TabsTrigger>
          <TabsTrigger className="w-[100%]" value="sent">
            Sent
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recieved">
          <OfferList offers={[offer]} isReceivedOffers={true} />
        </TabsContent>
        <TabsContent value="sent">
          <OfferList offers={[offer]} isReceivedOffers={false} />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Offers;
