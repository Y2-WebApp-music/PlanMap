import './LoadProfile.css'

export default function ProfileSkeleton(){
    return(
        <div className='ProfileSkeleton'>
            <div className='ProfileSkeleton-img'> </div>
            <div className='ProfileSkeleton-user'> </div>
            <div className='ProfileSkeleton-email'> </div>
        </div>
    )
}