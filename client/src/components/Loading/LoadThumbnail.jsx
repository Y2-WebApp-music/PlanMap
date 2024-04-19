import './LoadThumbnail.css'
export default function ThumbnailSkeleton(){
    return(
        <>
            <div className='PlanThumbnail-skeleton'>
                <div className="FilterArea-skeleton">
                    <div className="searchBox-skeleton">
                    </div>
                    <div className="BtnZone">
                        <div className='FilterBTN-skeleton'></div>
                        <div className='FilterBTN-skeleton'></div>
                    </div>
                </div>
                <div className='Thumbnail-sekeleton-grid'>
                    {[...Array(8)].map((thumbnail, index) => (
                        <div key={index} className="Thumbnail-sekeleton">
                            <div className='Thumbnail-sekeleton-title'></div>
                            <div className='Thumbnail-sekeleton-title'></div>
                            <div className='Thumbnail-sekeleton-title'></div>
                            <div className='Thumbnail-sekeleton-title'></div>
                            <div className='Thumbnail-sekeleton-button'></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}