import { useState } from "react";
import { Input } from "./ui/input";

const AddCard = ({ page }: { page: "owned" | "wanted" }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setModalOpen(true);
            setLoading(true);
            
            try {
                const response = await fetch(`/search?q=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();
                setCards(data.cards || []);
            } catch (error) {
                console.error("Error fetching cards:", error);
                setCards([]);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <Input
                type="text"
                placeholder="Search for a card"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
            />
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-neutral-800 p-4 rounded-lg w-80 max-h-[80vh] overflow-auto">
                        <h2 className="text-lg font-bold mb-4">Add Card</h2>
                        {loading ? (
                            <div className="text-center">Loading...</div>
                        ) : cards.length > 0 ? (
                            <ul className="space-y-2">
                                {cards.map((card: any, index: number) => (
                                    <li key={index} className="p-2 border rounded-md">
                                        {card.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center">No cards found</div>
                        )}
                        <button
                            className="mt-4 bg-gray-200 px-4 py-2 rounded-md"
                            onClick={() => setModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddCard;
