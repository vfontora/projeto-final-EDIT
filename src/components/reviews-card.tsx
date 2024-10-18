import { Highlighter, Star} from "@phosphor-icons/react";
import { Reviews } from "../@types/Reviews";
import { ReviewDelete } from "./review-delete";


type ReviewsCardProps = {
    reviews: Reviews,
/*     reloadReviews: () => void */
}

export function ReviewsCard(props: ReviewsCardProps) {
    return (
        <div>
            <div className="flex flex-col gap-4 p-4 border border-[#753b57] rounded-lg w-full h-44">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-1 items-center">
                        <p className="font-inconsolata text-[#292929] text-lg">{props.reviews.rating}</p>
                        <Star className="size-4 fill-[#753b57]" weight="fill"/>
                        <p className="font-inconsolata text-[#292929] text-lg"> - {props.reviews.room.hotel.name}</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Highlighter className="size-4 fill-[#753b57]" weight="fill"/>
                        <ReviewDelete reviews={props.reviews} /* reloadReviews={reloadReviews} *//>
                    </div>
                </div>
                <div>
                    <p className="font-inconsolata text-[#292929] text-base">{props.reviews.comment}</p>
                </div>
            </div>
        </div>
    )
}