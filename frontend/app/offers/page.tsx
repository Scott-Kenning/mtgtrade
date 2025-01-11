'use client'

import AddCard from "@/components/add-card";
import CardsList from "@/components/card-list";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const offers = [
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

const Offers = () => {
    return (
        <Container>
            <Tabs defaultValue="sent" className="w-[100%] dark">
                <TabsList className="w-[100%]">
                    <TabsTrigger className="w-[100%]" value="sent">Sent</TabsTrigger>
                    <TabsTrigger value="recieved" className="w-[100%]">Recieved</TabsTrigger>
                </TabsList>
                <TabsContent value="sent">
                </TabsContent>
                <TabsContent value="recieved">
                </TabsContent>
            </Tabs>
        </Container>
    )
}

export default Offers;