class Api::V1::EmployeeCutOffGroupMembersController < ApiController
  def index

    @cutgroups = EmployeeCutOffGroupMember.all
 
    render json: @cutgroups

  end

  def show
    set_cutgroup()

    render json: @cutgroup
  end

  def create
    @cutgroup = EmployeeCutOffGroupMember.new(cutgroups_params)
   
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
    if @cutgroup.update(cutgroups_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @cutgroup.errors
    end
  
  end

  def load_employees_to_cut_off_groups

    res = ActiveRecord::Base.connection.exec_query("call load_employees_to_groups")

    render json: res[0]

  end

  private 

  def set_cutgroup
    @cutgroup = EmployeeCutOffGroupMember.find(params[:id])
  end

  def cutgroups_params
    params.permit(:id, :cutoffgroupid ,:employeeid)
  end
end