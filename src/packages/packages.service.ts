import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';

@Injectable()
export class PackagesService {
  constructor(
    @Inject('PACKAGES_REPOSITORY')
    private packagesRepository: typeof Package,
  ) { }

  async createPackage(dto: CreatePackageDto) {
    dto.state = 1;
    return await this.packagesRepository.create(dto);
  }

  async updateStatePackge(state: number, id: number) {
    return await this.packagesRepository.update(
      { state: state },
      {
        where: {
          id: id,
        }
      });
  }

  async findPackageByState(state: number, warehouseId: number) {
    return await this.packagesRepository.findAll({
      where: {
        [Op.and]: [
          { state: state, },
          { warehouseId: warehouseId, },
        ]
      }
    });
  }
}
