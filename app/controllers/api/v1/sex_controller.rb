class Api::V1::SexController < ApiController
  def index
     
    @sexes = Sex.all
 
    render json: @sexes
  end

  def show
    set_sex()

    render json: @sex
  end

  def create
    @sex = Sex.new(sex_params)
   
    if @sex.save
      render json: @sex
    else
      render json: @sex.errors
    end
  end

  def destroy
    set_sex()
    @sex.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_sex()
    if @sex.update(sex_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @sex.errors
    end
  
  end

  private 

  def set_sex
    @sex = Sex.find(params[:id])
  end

  def sex_params
    params.permit(:id, :name,:active, :internal)
  end
end
