class Api::V1::EmployeeCutOffGroupsController < ApiController
  def index

    @cutgroups= EmployeeCutOffGroup.all
 
    render json: @cutgroups

  end

  def show
    set_cutgroup()

    render json: @cutgroup
  end

  def create
    @cutgroup = EmployeeCutOffGroup.new(cut_params)
   
    if @cutgroup.save
      render json: @cutgroup
    else
      render json: @cutgroup.errors
    end
  end

  def destroy
    set_cutgroup()
    @cutgroup.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_cutgroup()
    if @cutgroup.update(cut_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @cutgroup.errors
    end
  
  end

  private 

  def set_cutgroup
    @cutgroup = EmployeeCutOffGroup.find(params[:id])
  end

  def cut_params
    params.permit(:id, :name , :paymodeid, :description, :cutoffid, :year,:active, EmployeeCutOffGroup: [:name , :paymodeid, :description, :cutoffid, :year,:active])
  end
end


