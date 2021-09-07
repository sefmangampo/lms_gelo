class Api::V1::LeaveCreditsController < ApiController
  def index

    @leave_credits= VwLeaveCredit.all
 
    render json: @leave_credits

  end

  def show
    set_leave_credit()

    render json: @leave_credit
  end

  def create
    @leave_credit = LeaveCredit.new(leave_credit_params)
   
    if @leave_credit.save
      render json: @leave_credit
    else
      render json: @leave_credit.errors
    end
  end

  def destroy
    set_leave_credit()
    @leave_credit.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_leave_credit()
    if @leave_credit.update(leave_credit_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @leave_credit.errors
    end
  
  end

  private 

  def set_leave_credit
    @leave_credit = LeaveCredit.find(params[:id])
  end

  def leave_credit_params
    params.permit(:id, :employeeid, :year ,:credits, :leavetypeid)
  end
end
