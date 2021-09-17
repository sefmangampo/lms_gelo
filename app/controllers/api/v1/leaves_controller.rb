class Api::V1::LeavesController < ApiController
  def index

    @leaves = Leafe.all

    render json: @leaves

  end

  def show
    set_leave()

    render json: @leave
  end

  def create
    @leave = Leafe.new(leave_params)
   
    @leave.year = @leave.dateeffective.year
    
    if @leave.remarks.nil?
      @leave.remarks = ""
    end


    if @leave.save
      render json: @leave
    else
      render json: @leave.errors
    end
  end

  def destroy
    set_leave()
    @leave.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_leave()
    if @leave.update(leave_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @leave.errors
    end
  
  end

  private 

  def set_leave
    @leave = Leafe.find(params[:id])
  end

  def leave_params
    params.permit(:id, :employeeid, :datefiled ,:dateeffective, :remarks, :status, :year, :leavetypeid, :leafe, :quantity, :cutoffid)
  end
end
