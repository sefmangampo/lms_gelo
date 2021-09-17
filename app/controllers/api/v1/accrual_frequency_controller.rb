class Api::V1::AccrualFrequencyController < ApiController
  def index

    @afs = AccrualFrequency.all
 
    render json: @afs
  end

  def show
    set_af()

    render json: @af
  end

  def create
    @af = AccrualFrequency.new(af_params)
   
    if @af.save
      render json: @af
    else
      render json: @af.errors
    end
  end

  def destroy
    set_af()
    @af.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_af()
    if @af.update(af_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @af.errors
    end
  
  end

  private 

  def set_af
    @af = AccrualFrequency.find(params[:id])
  end

  def af_params
    params.permit(:id, :name,:ismonthly, :isyearly, :iscustom, :frequency)
  end
end
