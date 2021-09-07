class Api::V1::LeaveAccrualTypesController < ApiController
  def index

    @accrualtypes =  AccrualType.all

    render json: @accrualtypes

  end

  def show
    set_leave_accrual_type()

    render json: @accrualtype
  end

  def create
    @accrualtype = AccrualType.new(leave_accrual_type_params)
   
    if @accrualtype.save
      render json: @accrualtype
    else
      render json: @accrualtype.errors
    end
  end

  def destroy
    set_leave_accrual_type()
    @accrualtype.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_leave_accrual_type()
    if @accrualtype.update(leave_accrual_type_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @accrualtype.errors
    end
  
  end

  private 

  def set_leave_accrual_type
    @accrualtype = AccrualType.find(params[:id])
  end

  def leave_accrual_type_params
    params.permit(:id, :name, :active)
  end
end
