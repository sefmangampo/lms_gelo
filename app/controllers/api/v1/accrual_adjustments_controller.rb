class Api::V1::AccrualAdjustmentsController < ApiController
  def index

    @adjustments= AccrualAdjustment.all
 
    render json: @adjustments

  end

  def show
    set_adjustment()

    render json: @adjustment
  end

  def create
    @adjustment = AccrualAdjustment.new(adjustment_params)
   
    if @adjustment.save
      render json: @adjustment
    else
      render json: @adjustment.errors
    end
  end

  def destroy
    set_adjustment()
    @adjustment.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_adjustment()
    if @adjustment.update(adjustment_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @adjustment.errors
    end
  
  end

  private 

  def set_adjustment
    @adjustment = AccrualAdjustment.find(params[:id])
  end

  def adjustment_params
    params.permit(:id, :employeeid, :rate, :dateeffective, :remarks, :year, :createdbyid, :posted)
  end
end
