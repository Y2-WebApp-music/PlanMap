import './LoadPlan.css'

export default function PlanSkeleton(){
    return(
        <div className='sidebarView-skeleton'>
            <div className='PlanDetailView-grid'>
                <div className='PlanDetailView-grid-left'> </div>
                <div className='PlanDetailView-grid-right'> </div>
            </div>
            <div className='PlanDetailView-p'> </div>
            <div className='PlanDetailView-skeleton'> </div>
            <div className='PlanDetailView-p'> </div>
            <div className='PlanDetailView-grid'>
                <div className='PlanDetailView-grid-p-l'> </div>
                <div className='PlanDetailView-grid-p-r'> </div>
            </div>
            <div className='PlanDetailView-p'> </div>
            <div className='PlanDetailView-skeleton'> </div>
            <div className='PlanDetailView-p'> </div>
            <div className='PlanDetailView-skeleton'> </div>
        </div>
    )
}