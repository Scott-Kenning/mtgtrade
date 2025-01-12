'use client'

import AddCard from "@/components/add-card";
import CardsList from "@/components/card-list";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardType } from "@/types/types";

const cards: CardType[] = [
    {
        id: 1,
        name: "Card 1",
        set: "ABC"
    },
    {
        id: 2,
        name: "Card 2",
        set: "ABC"
    },
    {
        id: 3,
        name: "Card 3",
        set: "ABC"
    },
    {
        id: 4,
        name: "Card 4",
        set: "ABC"
    }
]

const Cards = () => {
    return (
        <Container>
            <Tabs defaultValue="owned" className="w-[100%] dark">
                <TabsList className="w-[100%]">
                    <TabsTrigger className="w-[100%]" value="owned">Owned</TabsTrigger>
                    <TabsTrigger value="wanted" className="w-[100%]">Wanted</TabsTrigger>
                </TabsList>
                <TabsContent value="owned">
                    <AddCard page={"owned"}/>
                    <CardsList cards={cards} />
                </TabsContent>
                <TabsContent value="wanted">Change your password here.</TabsContent>
            </Tabs>
        </Container>
    )
}

export default Cards;